import '../styles/Loading.css';

const Loading = () => {

    return (Array.from({ length: 3 }).map((_, index) => (
        <div className="video-item skeleton" key={index}>
            <div className="skeleton-video" />
            <div className="skeleton-overlay">
                <div className="skeleton-description" />
                <div className="skeleton-button" />
            </div>
        </div>
    ))
    )
};

export default Loading;
