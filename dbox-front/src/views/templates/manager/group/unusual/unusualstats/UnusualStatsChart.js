import { Fragment, useState } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Chart from "react-google-charts";
import { Button } from "@material-ui/core";

console.debug("UnusualStatsChart.js");

export default function UnusualStatsChart(props) {
  return (
    <Fragment>
      {props.search !== "A" ? (
        <Fragment>
          <h3>
            <ListAltIcon />
            {props.searchDataName}
          </h3>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.searchData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <h3>
            <ListAltIcon />
            다운로드 이력
          </h3>
          <Button
            variant="contained"
            onClick={(e) => {
              props.handleExcel("DL", e);
            }}
            color="primary"
          >
            excel
          </Button>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.downloadData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
          <h3>
            <ListAltIcon />
            반출 이력
          </h3>
          <Button
            variant="contained"
            onClick={(e) => {
              props.handleExcel("TO", e);
            }}
            color="primary"
          >
            excel
          </Button>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.takeoutData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
          <h3>
            <ListAltIcon />
            권한신청 이력
          </h3>
          <Button
            variant="contained"
            onClick={(e) => {
              props.handleExcel("AR", e);
            }}
            color="primary"
          >
            excel
          </Button>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.authReqData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
          <h3>
            <ListAltIcon />
            출력 이력
          </h3>
          <Button
            variant="contained"
            onClick={(e) => {
              props.handleExcel("PT", e);
            }}
            color="primary"
          >
            excel
          </Button>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.printData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
          <h3>
            <ListAltIcon />
            삭제 이력
          </h3>
          <Button
            variant="contained"
            onClick={(e) => {
              props.handleExcel("DT", e);
            }}
            color="primary"
          >
            excel
          </Button>
          <Chart
            width={"1000px"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={props.deleteData}
            options={props.options}
            rootProps={{ "data-testid": "2" }}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
