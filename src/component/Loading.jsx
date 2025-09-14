import '../styles/Loading.css';

const Loading = () => {

    return (Array.from({ length: 1 }).map((_, index) => (
        <div className="skeleton" key={index}>
            {/* <div className="skeleton-video" /> */}
            <div className="skeleton-overlay">
                <div className="skeleton-info">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-name" />
                </div>
                <div className="skeleton-description" />
            </div>
        </div>
    ))
    )
};

export default Loading;
