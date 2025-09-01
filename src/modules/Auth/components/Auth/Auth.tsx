import { authAPI } from "../../api/api.ts";
import { Modal } from "../../../../ui/Modal/Modal.tsx";
import { FormRegistration } from "../FormRegistration/FormRegistration.tsx";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import classes from "./Auth.module.css"

type AuthProps = {
    children: React.ReactNode;
}

export const Auth = ({children}: AuthProps) => {
    const {data: checkAuth, isLoading} = authAPI.useIsAuthQuery()

    console.log(checkAuth)

    return (
        <div>
            {
                isLoading
                    ? <Preloader/>
                    : checkAuth?.resultCode !== 0
                        ?
                        <>
                            <Modal>
                                <h1 className={classes.authTitle}>You're not authorized</h1>
                                <FormRegistration/>
                            </Modal>
                            {children}
                        </>
                        : children
            }
        </div>
    )
}