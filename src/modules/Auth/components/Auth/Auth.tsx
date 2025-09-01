import { authAPI } from "../../api/api.ts";

type AuthProps = {
    children: React.ReactNode;
}

export const Auth = ({children}: AuthProps) => {
    const {data: checkAuth} = authAPI.useIsAuthQuery()
    console.log(checkAuth)

    return (
        <div>
            {children}
        </div>
    )
}