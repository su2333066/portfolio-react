import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

function Detail() {
  let { algorithmSeq } = useParams();
  const [detail, setDetail] = React.useState([]);

  const 알고리즘상세정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/detail",
      params: { algorithmSeq },
    }).then((response) => {
      setDetail(response.data[0]);
    });
  };

  React.useEffect(() => {
    알고리즘상세정보가져오기();
  }, []);

  return (
    <div>
      {detail.title}
      {detail.tag}
      {detail.link}
      {detail.level}
    </div>
  );
}

export default Detail;
