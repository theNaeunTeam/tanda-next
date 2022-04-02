import {NextPage} from "next";
import {useRouter} from 'next/router'
import FindpwContainer from "../../containers/Common/FindpwContainer";
import PageNotFound from "../../components/Common/PageNotFound";

const findPwPage: NextPage = () => {
    const router = useRouter();
    const {id, token} = router.query;

    if (typeof id === 'string' && typeof token === 'string') {
        return (
            <FindpwContainer id={id} token={token}/>
        )
    } else {
        return <PageNotFound/>
    }


}
export default findPwPage;
