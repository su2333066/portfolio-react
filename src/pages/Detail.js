import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

axios.defaults.withCredentials = true;

function Detail() {
  let { algorithmSeq } = useParams();
  const [detail, setDetail] = React.useState({});

  const [loading, setLoading] = React.useState(true);

  const 알고리즘상세정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/detail",
      params: { algorithmSeq },
    }).then((response) => {
      setDetail(response.data[0]);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    알고리즘상세정보가져오기();
  }, []);

  if (loading === true) {
    return <div>로딩중..</div>;
  }

  /**
   * {
   *  title : zzzz
   *  tag : 111
   * }
   *
   * ['title','tag']
   */
  if (!detail) {
    return <div>데이터없음</div>;
  }

  return (
    <div>
      <Viewer
        linkAttributes="rel"
        usageStatistics={false}
        initialValue={detail.content}
      />
      {/* {detail.title}
      {detail.tag}
      {detail.link}
      {detail.level} */}
    </div>
  );
}

export default Detail;
