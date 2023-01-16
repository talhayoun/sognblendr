import { Typography } from "antd";

const { Title } = Typography
export const TitleDescription = (props) => {
    const { Icon } = props;
    return (
        <div style={styles.container}>
            <Title level={5}>{props.title}</Title>
            <div style={styles.content}>
                {Icon && <Icon />}
                <Typography style={{ direction: props.direction ? props.direction : "ltr" }}>{props.description}</Typography>
            </div>
        </div>
    );
};

const styles = {
    container: {
        borderBottom: '1px solid #eee',
        padding: '5px'
    },
    content: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center'
    }
}