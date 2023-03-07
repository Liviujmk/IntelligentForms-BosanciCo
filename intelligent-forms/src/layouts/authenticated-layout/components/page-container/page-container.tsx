import './page-container.css'

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export const PageContainer = ({ children }: Props) => {
    return <div className='page-container'>{children}</div>
}