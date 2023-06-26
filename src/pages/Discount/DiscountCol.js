import React from "react"
import { Link } from "react-router-dom"
import * as moment from "moment"
import { Badge } from "reactstrap"

const formateDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}
const toLowerCase1 = str => {
  return str === "" || str === undefined ? "" : str.toLowerCase()
}

const DiscountCode = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const DiscountPercentage = cell => {
  return cell.value ? cell.value : ""
}

const AllowRepeat = cell => {
  return (
    <Badge
      className={
        "font-size-12 badge-soft-" +
        (cell.value === "1"
          ? "success"
          : "danger" && cell.value === "0"
          ? "warning"
          : "danger")
      }
    >
      {cell.value}
    </Badge>
  )
}
const Status = cell => {
  return (
    <label><input type="checkbox" data-toggle="toggle" data-size="lg" /></label>
  )
}
export { DiscountCode, DiscountPercentage, Status, AllowRepeat }
