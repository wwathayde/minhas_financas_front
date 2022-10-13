import { useParams, useNavigate } from "react-router-dom";

export function navigate(Component) {
    return (props) => (
        <Component {...props} params={useParams()} navigate={useNavigate()} />
    );
}