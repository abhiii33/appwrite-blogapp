import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const authstatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (authentication && authstatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authstatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [authstatus, authentication, navigate]);

 

    return <div>{children}</div>;
};

export default Protected;
