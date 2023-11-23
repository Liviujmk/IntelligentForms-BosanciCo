import { BaseLayout } from "../layouts/base-layout/base.layout"
import { FirstFrame } from "../layouts/base-layout/components/homepage-first/homepage-first"
import { SecondFrame } from "../layouts/base-layout/components/homepage-second/homepage-second"
import { ThirdFrame } from "../layouts/base-layout/components/homepage-third/homepage-third"
import { FourthFrame } from "../layouts/base-layout/components/homepage-fourth/homepage-fourth"
import { Pricing } from "../layouts/authenticated-layout/components/pricing/pricing"
import HomepageForms from "../layouts/base-layout/components/homepage-forms/homepage-forms"
import QRCode from "../layouts/base-layout/components/qrCodeHomePage/qrCodeHomePage"
import { useRef } from "react"

export const HomePage = () => {
  const mySectionRef = useRef(null);

    return (
        <BaseLayout>
            <FirstFrame myRef={mySectionRef} />
            <QRCode />
            <HomepageForms myRef={mySectionRef} />
            <SecondFrame />
            <ThirdFrame />
            <FourthFrame />
        </BaseLayout>
    )
}