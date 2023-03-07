import { Navigation } from "./components/navigation/navigation";
import { PageContainer } from "./components/page-container/page-container";

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export const AuthenticatedLayout = ({ children }: Props) => {
    return (
        <PageContainer>
            <div className="card">
                <Navigation />
                {children}
            </div>
        </PageContainer>
    )
}