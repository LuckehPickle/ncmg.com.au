import React, { FunctionComponent } from 'react'

import CompanyInfo from './CompanyInfo'
import Copy from './Copy'
import ClockIcon from './icons/Clock'
import Logo from './Logo'
import Link from './Link'
import LocationPinIcon from './icons/LocationPin'
import MailOpenIcon from './icons/MailOpen'
import PhoneIcon from './icons/Phone'
import PrinterIcon from './icons/Printer'
import Wrapper from './Wrapper'

const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-grey-900 border-b-4 border-zesty-500">
      <Wrapper className="grid grid-cols-footer gap-20 py-20">
        <Logo size="medium" variant="labelled" />

        <div>
          <CompanyInfo icon={LocationPinIcon} label="Address">
            <Copy>
              207 Lake Road
              <br />
              Port Macquarie, NSW 2444
              <br />
              Australia
            </Copy>
          </CompanyInfo>

          <CompanyInfo icon={ClockIcon} label="Open">
            <Copy>
              7am til 3:30pm
              <br />
              Monday to Friday
            </Copy>
          </CompanyInfo>
        </div>

        <div>
          <CompanyInfo icon={PhoneIcon} label="Phone">
            <Copy>
              <Link to="tel:65811355" external>
                (02) 6581 1355
              </Link>
            </Copy>
          </CompanyInfo>

          <CompanyInfo icon={PrinterIcon} label="Fax">
            <Copy>
              <Link to="tel:65810949" external>
                (02) 6581 0949
              </Link>
            </Copy>
          </CompanyInfo>

          <CompanyInfo icon={MailOpenIcon} label="Email">
            <Copy>
              <Link to="mailto:sales@ncmg.com.au" external>
                sales@ncmg.com.au
              </Link>
            </Copy>
          </CompanyInfo>
        </div>
      </Wrapper>

      <div className="p-6">
        <Wrapper>
          <Copy align="center" measure={false}>
            &copy; {currentYear} North Coast Marble &amp; Granite
          </Copy>
          <Copy align="center" measure={false} className="mt-1">
            ncmg.com.au is created and maintained by{' '}
            <Link to="https://www.seanbailey.dev">Sean Bailey</Link>.
          </Copy>
        </Wrapper>
      </div>
    </footer>
  )
}

export default Footer
