import {toast} from "react-toastify";

const validate = function (title, releaseYear, stars)  {

    let split = stars.replaceAll(" ", '').split(',')
    let set = new Set(split);

    if (stars === '' || title === '' || releaseYear === '') {
        toast.error("All fields is required")
        return false
    }

    if (parseInt(releaseYear) >= 2022 || parseInt(releaseYear) < 1850) {
        toast.error("Not suitable years")
        return false
    }

    if (set.size !== split.length) {
        toast.error("Stars can`t be repeated")
        return false
    }

    return true
}

export default validate