module.exports = {
  fromDbColumnFormat,
  toDbColumnFormat,
} 

function fromDbColumnFormat(db_val) {
  let arr_id_val = []
  if (db_val.search(/,/g) != -1) {
    db_val.split(", ").forEach((id_val) => {
      arr_id_val.push({id: id_val.split(":")[0], value: id_val.split(":")[1]})
    })
  } else {
    arr_id_val.push({id: db_val.split(":")[0], value: db_val.split(":")[1]})
  }

  return arr_id_val
}

function toDbColumnFormat(val) {

}