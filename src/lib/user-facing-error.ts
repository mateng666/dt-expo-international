import { ApiError } from "./api";

/**
 * 将后端运维向文案映射为门户观众可读英文提示（不直接透传内部异常）。
 */
export function toUserFacingError(
  err: unknown,
  fallback: string,
): string {
  const raw =
    err instanceof ApiError
      ? err.message
      : err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : "";

  const text = raw.trim();
  if (!text) return fallback;

  if (
    /未找到大会购票通道|购票通道不存在|Channel unavailable|子会议未关联|关联的购票通道无效/i.test(
      text,
    )
  ) {
    return "Tickets are not available for this event yet. Please check back later or contact the organizer.";
  }
  if (/Meeting ended|会议已结束|meetingEnded/i.test(text)) {
    return "This event has ended. Registration is closed.";
  }
  if (/Channel closed|通道.*关闭|channelClosed/i.test(text)) {
    return "Registration for this channel is currently closed.";
  }
  if (/Meeting not found|Meeting unavailable|会议不存在|LINK_EXPO/i.test(text)) {
    return "This event is unavailable.";
  }
  if (/Invalid link|LINK_INVALID|LINK_PARAM/i.test(text)) {
    return "This registration link is invalid or incomplete.";
  }
  if (/Invite invalid|邀请码/i.test(text)) {
    return "This invite code is invalid or expired.";
  }
  if (/Ticket type invalid|票种/i.test(text)) {
    return "The selected ticket type is invalid. Please choose again.";
  }
  if (/occupied|限购|已报名/i.test(text)) {
    return "This email already has a registration for this event.";
  }
  if (/email.*verif|未验证|EMAIL_NOT_VERIFIED/i.test(text)) {
    return "Please verify your email before registering.";
  }
  if (/Unauthorized|401|登录|未登录/i.test(text)) {
    return "Please sign in to continue.";
  }

  // 中文运维文案 / 过长堆栈：一律不直接展示
  if (/[\u4e00-\u9fff]/.test(text) || text.length > 120) {
    return fallback;
  }

  return text;
}
