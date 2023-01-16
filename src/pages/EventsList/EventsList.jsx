import { Grid, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDjEventsList } from "../../apis/dj";

const { useBreakpoint } = Grid;
const { Title } = Typography;
export default function EventsList() {
  const isMobile = useBreakpoint().xs;
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const styles = {
    container: {
      display: isMobile ? "block" : "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: isMobile ? "100%" : "unset",
      width: isMobile ? "100%" : "370px",
      backgroundColor: "#f4ca16",
    },
    header: {
      width: "100%",
      height: "4rem",
      padding: "20px",
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },

  ];

  const fetchEventList = async () => {
    const response = await getDjEventsList();
    if (response?.data?.events?.length > 0) {

      const parsedData = response.data.events.map((currentEvent, index) => {
        const date = new Date(currentEvent.date);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        return {
          key: index,
          id: currentEvent.id,
          name: currentEvent.name,
          date: formattedDate,
          time: currentEvent.event_start,
        };
      });
      setData(parsedData);
    }
  };
  useEffect(() => {
    fetchEventList();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={4}>Events List</Title>
      </div>
      <div>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: () => navigate(`/djplaylist/${record.id}`),
            };
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
}
