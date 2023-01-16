import { Grid, Typography } from 'antd';
import React from 'react'

const { Title } = Typography
const { useBreakpoint } = Grid
export default function Terms() {
  const isMobile = useBreakpoint().xs;
  const styles = {
    container: {
      display: 'flex',
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "column",
      height: isMobile ? "100%" : "500px",
      width: isMobile ? "100%" : "370px",
      backgroundColor: "#f4ca16",
    }
  }
  return (
    <div style={styles.container}>
      <Title level={4}>SongBlendr Terms of Service</Title>
      <Title level={4}>Privacy Policy</Title>
    </div>
  )
}
