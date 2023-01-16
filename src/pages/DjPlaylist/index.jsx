import { Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    findDjEventById,
    findDjPlaylists,
    savePlaylistToEvent,
} from "../../apis/dj";
import { Option } from "antd/lib/mentions";
import BlueButton from "../../components/styled-components/StyledButtons/BlueButton/BlueButton";

export const DjPlaylist = () => {
    const { eventId } = useParams();
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [event, setEvent] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const getEvent = async () => {
        try {
            const response = await findDjEventById(eventId);
            setEvent(response?.data?.event)
            form.setFieldsValue({ ...response?.data?.event });
        } catch (error) {
            message.error("Failed to find event");
            navigate("/eventslist");
        }
    };
    const getPlaylists = async () => {
        try {
            const response = await findDjPlaylists();
            setPlaylists(response?.data?.playlists);
        } catch (error) {
            message.error("Failed to find playlists");
        }
    };

    const savePlaylist = async (values) => {
        console.log(values);
        try {
            await savePlaylistToEvent(eventId, playlist, values);
            message.success("Updated event successfully");
            const findPlaylist = playlists.find((e) => e.id == playlist);
            setCurrentPlaylist(() => findPlaylist);
        } catch (error) {
            console.log(error)
            message.error("Failed to update event");
        }
    };

    useEffect(() => {
        getEvent();
        getPlaylists();
    }, []);

    useEffect(() => {
        const findPlaylist = playlists.find((e) => e.id == event.playlistId);
        setCurrentPlaylist(findPlaylist);
    }, [playlists, event]);

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="create event"
                onFinish={savePlaylist}
                scrollToFirstError
            >
                <h1>Event {form.getFieldValue("name")}</h1>

                <Form.Item name="participants" label="Participants">
                    <Input style={{ borderRadius: "20px" }} />
                </Form.Item>
                <Form.Item name="party_code" label="Party Code">
                    <Input style={{ borderRadius: "20px" }} />
                </Form.Item>
                <Form.Item name="name" label="Events Name">
                    <Input style={{ borderRadius: "20px" }} />
                </Form.Item>
                <Form.Item name="minimumVotes" label="Minimum Votes">
                    <Input style={{ borderRadius: "20px" }} type="number" />
                </Form.Item>
                <Form.Item name="minimumSongs" label="Minimum Playlist Songs">
                    <Input style={{ borderRadius: "20px" }} type="number" />
                </Form.Item>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h3>Current Playlist: {currentPlaylist?.name ?? "-"}</h3>
                    <Select
                        style={{ width: "200px" }}
                        onChange={(e) => setPlaylist(e)}
                        value={playlist}
                    >
                        {playlists &&
                            playlists.map((song, index) => (
                                <Option key={index} value={song.id}>
                                    {song?.name}
                                </Option>
                            ))}
                    </Select>

                    <BlueButton
                        style={{ height: "50px" }}
                        disabled={!playlist}
                        htmlType="submit"
                    >
                        Save
                    </BlueButton>
                </div>
            </Form>
        </div>
    );
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 11,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
