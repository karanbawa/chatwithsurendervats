import React from "react"
import { Link } from "react-router-dom"
import * as moment from "moment"

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
    <div className="form-check form-switch form-switch-md ">
      {cell.value ? (
        <input
          onChange={cell.handleAllowRepeats}
          type="checkbox"
          checked
          className="form-check-input"
        />
      ) : (
        <input
          onChange={cell.handleAllowRepeats}
          type="checkbox"
          className="form-check-input"
        />
      )}
    </div>
  )
}
const Status = ({handleStatuses}) => {
 // console.log(cell)
  return (
    <div className="form-check form-switch form-switch-md ">
      <input
        onChange={handleStatuses}
        onClick={handleStatuses}
        type="checkbox"
        className="form-check-input"
      />
    </div>
  )
}
export { DiscountCode, DiscountPercentage, Status, AllowRepeat }
