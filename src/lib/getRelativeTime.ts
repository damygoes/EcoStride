import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

type timeInput = string;

export function getRelativeTime(createdAt: timeInput) {
  return dayjs(createdAt).fromNow();
}
