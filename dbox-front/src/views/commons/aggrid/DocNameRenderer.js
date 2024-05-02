import { Fragment } from "react";
import ContentIcon from "views/commons/icon/ContentIcon";

console.debug("DocNameRenderer.js");

export default function DocNameRenderer({ data, valueFormatted, value }) {
  return (
    <Fragment>
      <ContentIcon type={data?.nodeTypeCode} />
      <span>{valueFormatted ? valueFormatted : value}</span>
    </Fragment>
  );
}
