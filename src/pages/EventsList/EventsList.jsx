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
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  useEffect(() => {
    const fetchEventList = async () => {
      const djId = localStorage.getItem("djId");

      if (!djId) {
        return navigate("/");
      }

      const response = await getDjEventsList(djId);
      if (response?.data?.data?.length > 0) {
        const parsedData = response.data.data.map((currentEvent, index) => {
          return {
            key: index,
            id: currentEvent.id,
            name: currentEvent.name,
            date: currentEvent.event_date,
            time: currentEvent.event_start,
          };
        });
        setData(parsedData);
      }
    };
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
              onClick: () => navigate(`/djplaylist/${record.id}`)
            };
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
}
