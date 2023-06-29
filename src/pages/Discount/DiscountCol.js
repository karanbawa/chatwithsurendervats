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
  const statusText = cell.value === "Yes"  ? "Yes"  : "No"
  return (
    <Badge color = { statusText === "Yes" ? "success" : "secondary"}
    >
      {statusText}
    </Badge>
  )
}
const Status = cell => {
  const statusText = cell.value === "Yes"  ? "Active"  : "InActive"
  return (
    <Badge color = { cell.value === "Yes" ? "success" : "secondary"}
    >
      {statusText}
    </Badge>
  )
}
export { DiscountCode, DiscountPercentage, Status, AllowRepeat }
