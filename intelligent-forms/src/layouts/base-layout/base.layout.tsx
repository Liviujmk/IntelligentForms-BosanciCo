import { BaseNavigation } from "./components/base-navigation/base-navigation";
import { PageContainer } from "../authenticated-layout/components/page-container/page-container";

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export const BaseLayout = ({ children }: Props) => {
    return (
        <PageContainer>
            <div className="card">
                <BaseNavigation />
                {children}
            </div>
        </PageContainer>
    )
}