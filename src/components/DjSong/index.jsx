import { CaretUpOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Modal, Skeleton, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

export const DjSong = ({ song }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onClickDeleteSong = () => { };

    return (
        <>
            <Card
                style={{ width: "100%", marginTop: 16 }}
                actions={[
                    <div>
                        <span>{song?.rating ?? 0}</span>
                        <CaretUpOutlined
                            style={{ fontSize: "30px", color: "#32cd32" }}
                            key="vote"
                        />
                    </div>,
                    <DeleteOutlined
                        key="delete"
                        onClick={() => setIsModalVisible(true)}
                    />,
                ]}
            >
                <Skeleton loading={false} avatar active>
                    <div style={{ display: "flex" }}>
                        <Title level={5}>{song?.song_name}</Title>
                    </div>
                </Skeleton>
            </Card>
            <Modal
                centered
                title="Delete Song"
                visible={isModalVisible}
                onOk={onClickDeleteSong}
                onCancel={() => setIsModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>{`Are you sure you want to delete song - ${song?.song_name} `}</p>
            </Modal>
        </>
    );
};
