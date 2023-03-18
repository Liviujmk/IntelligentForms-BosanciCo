import { BaseLayout } from "../layouts/base-layout/base.layout"
import { FirstFrame } from "../layouts/base-layout/components/homepage-first/homepage-first"
import { SecondFrame } from "../layouts/base-layout/components/homepage-second/homepage-second"
import { ThirdFrame } from "../layouts/base-layout/components/homepage-third/homepage-third"
import { FourthFrame } from "../layouts/base-layout/components/homepage-fourth/homepage-fourth"
import { Pricing } from "../layouts/authenticated-layout/components/pricing/pricing"

export const HomePage = () => {
    return (
        <BaseLayout>
            <FirstFrame />
            <SecondFrame />
            <ThirdFrame />
            <FourthFrame />
            <div id="pricing-title">Pricing</div>
            <Pricing />
        </BaseLayout>
    )
}