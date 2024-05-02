import fileSize from "filesize";
import {format, intervalToDuration, parseISO} from "date-fns";

console.debug("format-util.js");

const DATE_FORMAT = "yyyy-MM-dd";

const FormatUtil = {
  /**
   * 파일 사이즈 포맷
   */
  formatFileSize: (value) => (value || value === 0 ? fileSize(parseInt(value)) : ""),

  /**
   * 날짜 포맷
   */
  formatDate: (value) => {
    const emptyString = "";
    try {
      return value ? format(parseISO(value), DATE_FORMAT) : emptyString
    } catch {
      return emptyString;
    }
  },

  formatElapsedTime: (from) => {
    const isEmpty = !from || from === "1753-01-01";
    if (isEmpty) return '-';
    const duration = intervalToDuration({
      start: Date.parse(from),
      end: new Date()
    });
    const periodWith = (value, text) => value ? `${value}${text} ` : "";
    return `${periodWith(duration.years, '년')}${periodWith(duration.months, '개월')}${periodWith(duration.days, '일')}`
  },

  /**
   * 문서 Naming Rule
   * 파일명_팀명_버전_날짜_작성자
   */
  fileNameFormat: (data, user) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (1 + today.getMonth())).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${data.objectName}_${user.orgNm}_${Math.floor(data.rVersionLabel[data.rVersionLabel.length-1])}_${year}-${month}-${day}_${user.displayName}.${data.uFileExt}`
  },
};

export default FormatUtil;
