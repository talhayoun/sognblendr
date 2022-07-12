import { Button, Collapse, Input, Form, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addSongToEvent, fetchEventSongsById } from "../../apis/events";
import { DjSong } from "../../components/DjSong";
import { SendOutlined } from "@ant-design/icons";
import { createSong, getSongsByDjId } from "../../apis/dj";

const { Panel } = Collapse;
const { Title } = Typography;

export const DjPlaylist = () => {
    const { eventId } = useParams();
    const [songs, setSongs] = useState([]);
    const [songName, setSongName] = useState("");
    const djId = localStorage.getItem("djId");
    useEffect(() => {
        const getEventSongs = async () => {
            const response = await fetchEventSongsById(eventId);
            const songList = response.data.data;
            if (songList?.length > 0) {
                let sortedSongs = songList.sort((previous, current) =>
                    +previous.rating > +current.rating ? -1 : 1
                );
                setSongs(sortedSongs);
            }
        };
        getEventSongs();
    }, []);

    const onAddSong = async (formValues) => {
        const response = await createSong(djId, formValues);
        if (response?.data?.message && response.status == 200) {
            const songsResponse = await getSongsByDjId(djId);
            if (songsResponse?.data?.data) {
                const song = songsResponse?.data?.data?.filter(
                    (currentSong) => currentSong?.name == formValues?.name
                )[0];
                const addSongResponse = await addSongToEvent(eventId, song?.id);
                console.log(addSongResponse);
                if (addSongResponse?.data?.message) {
                    message.success("Song added to event successfully", 3);
                }
            }
        }
    };

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "20px", background: "#fff" }}>
                    <Collapse>
                        <Panel level={4} header="Add a song to this event">
                            <Form onFinish={onAddSong}>
                                <Form.Item
                                    label="Song Name"
                                    name="name"
                                    required={true}
                                    rules={[{ required: true, message: "Song name is required" }]}
                                >
                                    <Input
                                        placeholder="Add song name"
                                        allowClear
                                        onChange={(e) => setSongName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Genere"
                                    name="genere"
                                    required={true}
                                    rules={[{ required: true, message: "Genere is required" }]}
                                >
                                    <Input
                                        placeholder="Add genere"
                                        allowClear
                                        onChange={(e) => setSongName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Artist"
                                    name="artist"
                                    required={true}
                                    rules={[
                                        { required: true, message: "Song artist is required" },
                                    ]}
                                >
                                    <Input
                                        placeholder="Add artist name"
                                        allowClear
                                        onChange={(e) => setSongName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item label="Song URL" name="url">
                                    <Input
                                        placeholder="Add URL"
                                        allowClear
                                        onChange={(e) => setSongName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Collapse>
                </div>
                {songs?.map((currentSong, index) => (
                    <DjSong song={currentSong} key={index} />
                ))}
            </div>
        </div>
    );
};
