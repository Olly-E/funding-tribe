import dayjs from "dayjs";
import { AxiosErrorResponse } from "../types";

export const formatAmount = (number: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const getFormattedDate = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("ddd DD MMMM, YYYY");
};

export const convertTo12HourWithout = (time24: string) => {
  const [hours, minutes] = time24?.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // Convert 0 -> 12 for midnight
  return `${hours12?.toString()?.padStart(2, "0")}:${minutes?.toString().padStart(2, "0")} ${period}`;
};

export const transformError = (error: AxiosErrorResponse): string => {
  const errorDetail = error.response?.data?.message;
  if (!errorDetail) return "An unknown error occurred";
  if (Array.isArray(errorDetail)) {
    const firstError = errorDetail[0];
    if (firstError && typeof firstError === "object" && "msg" in firstError) {
      return (firstError as { msg: string }).msg;
    }
    return JSON.stringify(firstError);
  }
  return errorDetail;
};

export const getFormattedDayMonthYear = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("YYYY.MM.DD");
};

const emailUser = "contact";
const emailDomain = "fundingtribe";
const emailTld = "co.uk";
const phoneParts = ["+44", "20", "3904", "7188"];
export const phone = phoneParts.join("");
export const email = `${emailUser}@${emailDomain}.${emailTld}`;
export const mapAddress =
  "https://www.google.com/maps/place/Floor+33,+25+Canada+Square,+Canary+Wharf+Estate,+London+E14+5LB,+UK/@51.504237,-0.0207889,17z/data=!3m2!4b1!5s0x487602b9fb72113b:0x6e045060ab585548!4m6!3m5!1s0x487602b9fc94624b:0x601d428d6c548f64!8m2!3d51.504237!4d-0.018214!16s%2Fg%2F11sn006tjd?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";
