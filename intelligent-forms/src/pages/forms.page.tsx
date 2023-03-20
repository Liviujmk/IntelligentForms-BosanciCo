import { Link } from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/authenticated-layout/Authenticated.layout';
import { CreateForm } from '../features/forms/components/create-form/create-form';
export const FormsPage = () => {
    return (
        <AuthenticatedLayout>
            <h1>Forms</h1>
            <button className='login-button'>
                <Link to="create">Create new form</Link>
            </button>
        </AuthenticatedLayout>
    )
}