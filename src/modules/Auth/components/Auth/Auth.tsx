import { authAPI } from "../../api/api.ts";
import { Modal } from "../../../../ui/Modal/Modal.tsx";
import { FormRegistration } from "../FormRegistration/FormRegistration.tsx";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";

type AuthProps = {
    children: React.ReactNode;
}

export const Auth = ({children}: AuthProps) => {
    const {data: checkAuth, isLoading} = authAPI.useIsAuthQuery()
    return (
        <div>
            {
                isLoading
                    ? <Preloader/>
                    : checkAuth?.resultCode !== 0
                        ?
                        <>
                            <Modal>
                                <FormRegistration/>
                            </Modal>
                            {children}
                        </>
                        : children
            }
        </div>
    )
}