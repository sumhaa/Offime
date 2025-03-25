import {useEffect, useState} from "react";
import axios from "axios";

function ReportCreateOptionBlock({type, questionId}) {

    const [optionList, setOptionList] = useState([]);

    const getOptionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/questions/${questionId}`).then((res) => setOptionList(res.data))
    }

    useEffect(() => {
        getOptionList();
    }, []);

    return (
        <div>
            {optionList.map((option) => (
                <div>
                    <input type={type} value={option}/> {option}
                </div>
            ))}
        </div>
    )
}

export default ReportCreateOptionBlock;