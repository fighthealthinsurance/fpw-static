import styles from "@/styles/typography.module.css";
import { Box, Container, Title, TypographyStylesProvider } from "@mantine/core";
import React from "react";

const BusinessAssociateAgreement = () => {
  return (
    <Container size="lg">
      <Box py={32}>
        <TypographyStylesProvider className={styles.typographyStyles}>
          <Title ta="center" mb={32}>
            FIGHT PAPERWORK BUSINESS ASSOCIATE AGREEMENT
          </Title>

          <p>
            This Business Associate Agreement (“<strong>BAA</strong>”) is
            entered into between Fight Health Insurance, Inc. (“
            <strong>Business Associate</strong>”) and the customer agreeing to
            the terms below (“Covered Entity”), and supplements, amends and is
            incorporated into the Fight Paperwork Terms of Service located at{" "}
            <a href="https://www.fightpaperwork.com/terms-of-service">
              www.fightpaperwork.com/terms-of-service
            </a>{" "}
            (“<strong>Terms</strong>”). This BAA sets out the responsibilities
            and obligations of Business Associate as a business associate of
            Covered Entity under the Health Insurance Portability and
            Accountability Act (“<strong>HIPAA</strong>”) and the Health
            Information Technology for Economic and Clinical Health Act (“
            <strong>HITECH Act</strong>”).
          </p>

          <p className="text-center">
            <strong>RECITALS:</strong>
          </p>
          <ol type="A">
            <li>
              Covered Entity and Business Associate are parties to the Terms
              pursuant to which Business Associate may provide certain services
              to Covered Entity (“<strong>Services</strong>”).
            </li>
            <li>
              In conjunction with Services, Covered Entity may make available to
              Business Associate Protected Health Information of Individuals,
              which Business Associate may only Use or Disclose in accordance
              with this BAA.
            </li>
          </ol>

          <p className="text-center">
            <strong>AGREEMENT:</strong>
          </p>
          <p>
            Business Associate and Covered Entity agree to the terms and
            conditions of this BAA in order to comply with the rules on handling
            of Protected Health Information under the HIPAA Standards for
            Privacy of Individually Identifiable Health Information, 45 C.F.R.
            Part 160 and Part 164, Subpart E (“<strong>Privacy Rule</strong>”),
            the HIPAA Security Standards, 45 C.F.R. Part 160 and Part 164,
            Subpart C (“<strong>Security Rule</strong>”), and the HIPAA Breach
            Notification Regulations, 45 C.F.R. Part 164, Subpart D (“
            <strong>Breach Notification Rule</strong>”), all as amended from
            time to time.
          </p>

          <ol type="1">
            <li>
              <strong>DEFINITIONS</strong>

              <ol type="a">
                <li>
                  <strong>Terms Defined in Regulation</strong>: Unless otherwise
                  provided in this BAA or the Terms, all capitalized terms in
                  this BAA will have the same meaning as provided under the
                  Privacy Rule, the Security Rule, and the Breach Notification
                  Rule.
                </li>
                <li>
                  <strong>Protected Health Information or PHI</strong>:
                  Protected Health Information (“<strong>PHI</strong>”) means
                  PHI that is received from Covered Entity, or created,
                  maintained or transmitted on behalf of Covered Entity, by
                  Business Associate.{" "}
                </li>
              </ol>
            </li>

            <li>
              <strong>
                USES AND DISCLOSURES OF PROTECTED HEALTH INFORMATION
              </strong>

              <ol type="a">
                <li>
                  <strong>Performance of Services</strong>: Business Associate
                  will Use or Disclose PHI only for those purposes necessary to
                  perform Services, or as otherwise expressly permitted in this
                  BAA or Required by Law, and will not further Use or Disclose
                  such PHI.
                </li>
                <li>
                  <strong>Subcontractors</strong>: Business Associate agrees
                  that, in accordance with 45 C.F.R. § 164.502(e)(1), if
                  Business Associate’s Subcontractor creates, receives,
                  maintains or transmits PHI on behalf of Business Associate,
                  Business Associate will enter into an agreement with such
                  Subcontractor that contains substantially the same
                  restrictions and conditions on the Use and Disclosure of PHI
                  as contained in this BAA.
                </li>
                <li>
                  <strong>
                    Business Associate Management, Administration and Legal
                    Responsibilities
                  </strong>
                  : Business Associate may Use PHI for Business Associate’s
                  management and administration, or to carry out Business
                  Associate’s legal responsibilities. Business Associate may
                  Disclose PHI to a third party for such purposes only if: (1)
                  the Disclosure is Required by Law; or (2) Business Associate
                  secures written assurance from the receiving party that the
                  receiving party will: (i) hold the PHI confidentially; (ii)
                  Use or Disclose the PHI only as Required by Law or for the
                  purposes for which it was Disclosed to the recipient; and
                  (iii) notify the Business Associate of any other Use or
                  Disclosure of PHI.
                </li>
                <li>
                  <strong>Data Aggregation and De-Identification</strong>:
                  Business Associate may Use PHI to perform data aggregation
                  services as permitted by 45 C.F.R. § 164.504(e)(2)(i)(B).
                  Business Associate may also de-identify PHI in accordance with
                  45 C.F.R. § 164.514, thus rendering such information
                  “De-Identified Information” and not PHI subject to HIPAA or
                  the HITECH Act. Business Associate shall have exclusive right
                  and title in all De-Identified Information and may use
                  De-Identified Information for any lawful purpose.
                </li>
                <li>
                  <strong>Covered Entity Responsibilities</strong>: To the
                  extent Business Associate is to carry out Covered Entity’s
                  obligations under the Privacy Rule, Business Associate will
                  comply with the requirements of the Privacy Rule that apply to
                  Covered Entity’s compliance with such obligations.
                </li>
              </ol>
            </li>

            <li>
              <strong>SAFEGUARDS FOR PROTECTED HEALTH INFORMATION</strong>

              <ol type="a">
                <li>
                  <strong>Adequate Safeguards</strong>: Business Associate will
                  implement and maintain appropriate safeguards to prevent any
                  Use or Disclosure of PHI for purposes other than those
                  permitted by this BAA, including administrative, physical and
                  technical safeguards to protect the confidentiality,
                  integrity, and availability of any electronic protected health
                  information (“
                  <strong>ePHI</strong>”), if any, that Business Associate
                  creates, receives, maintains, and transmits on behalf of
                  Covered Entity.
                </li>
                <li>
                  <strong>Compliance with HIPAA Security Rule</strong>: Business
                  Associate will comply with the applicable requirements of the
                  HIPAA Security Rule.
                </li>
              </ol>
            </li>

            <li>
              <strong>
                REPORTS OF IMPROPER USE OR DISCLOSURE OF PROTECTED HEALTH
                INFORMATION, SECURITY INCIDENTS AND BREACHES
              </strong>

              <ol type="a">
                <li>
                  <strong>Use or Disclosure Not Permitted by This BAA</strong>:
                  Business Associate will report in writing to Covered Entity
                  any Use or Disclosure of PHI for purposes other than those
                  permitted by this BAA within twenty (20) business days of
                  Business Associate’s learning of such Use or Disclosure.
                </li>
                <li>
                  <strong>Security Incident and Breach Reporting</strong>:
                  Business Associate will promptly notify Covered Entity of (i)
                  any Security Incident of which Business Associate becomes
                  aware, subject to Section 4(c); and (ii) any Breach that
                  Business Associate discovers, including Breaches of unsecured
                  PHI in accordance with 45 CFR § 164.410 of the Breach
                  Notification Rule, provided that any notice for Breach will be
                  made promptly and without unreasonable delay. Notifications
                  made under this section will describe, to the extent possible,
                  details of a Breach, including steps taken to mitigate the
                  potential risks and steps Business Associate recommends
                  Covered Entity take to address the Breach.
                </li>
                <li>
                  <strong>Unsuccessful Attempts</strong>. Notwithstanding
                  Section 4(b), this Section 4(c) will be deemed as notice to
                  Covered Entity that Business Associate periodically receives
                  unsuccessful attempts (including without limitation pings,
                  unsuccessful log-on attempts, denial of service attacks, port
                  scans and attempts) for unauthorized access, use, disclosure,
                  modification, or destruction of information, or interference
                  with the general operation of Business Associate’s systems and
                  the Services. Covered Entity acknowledges and agrees that even
                  if such events constitute a Security Incident, Business
                  Associate will not be required to provide any notice under
                  this BAA regarding such unsuccessful attempts other than this
                  Section 4(c).
                </li>
              </ol>
            </li>

            <li>
              <strong>ACCESS TO PROTECTED HEALTH INFORMATION</strong>

              <ol type="a">
                <li>
                  <strong>Covered Entity Access</strong>: To the extent Business
                  Associate maintains PHI in a Designated Record Set that is not
                  duplicative of a Designated Record Set maintained by Covered
                  Entity, Business Associate will make such PHI available to
                  Covered Entity within twenty (20) business days of a request
                  by Covered Entity for access to such PHI.
                </li>
                <li>
                  <strong>Individual Access</strong>: If an Individual makes a
                  request for access directly to Business Associate, Business
                  Associate will within fifteen (15) business days forward such
                  request in writing to Covered Entity. Covered Entity will be
                  responsible for making all determinations regarding the grant
                  or denial of an Individual’s request for PHI and Business
                  Associate will make no such determinations. Only Covered
                  Entity will release PHI to an Individual pursuant to such a
                  request, unless Covered Entity directs Business Associate to
                  do so.
                </li>
              </ol>
            </li>

            <li>
              <strong>AMENDMENT OF PROTECTED HEALTH INFORMATION</strong>

              <ol type="a">
                <li>
                  <strong>Covered Entity Request</strong>: To the extent
                  Business Associate maintains PHI in a Designated Record Set
                  that is not duplicative of a Designated Record Set maintained
                  by Covered Entity, Business Associate will provide such PHI to
                  Covered Entity for amendment within twenty (20) business days
                  of receiving a request from Covered Entity to amend an
                  Individual’s PHI. Alternatively, if Covered Entity’s request
                  includes specific instructions on how to amend the PHI,
                  Business Associate will incorporate such amendment into the
                  PHI it holds in a Designated Record Set within twenty (20)
                  business days of receipt of the Covered Entity’s request.
                </li>
                <li>
                  <strong>Individual Request</strong>: If an Individual makes a
                  request for amendment directly to Business Associate, Business
                  Associate will within fifteen (15) business days forward such
                  request in writing to Covered Entity. Covered Entity will be
                  responsible for making all determinations regarding amendments
                  to PHI and Business Associate will make no such determinations
                  unless Covered Entity directs Business Associate to do so.
                </li>
              </ol>
            </li>

            <li>
              <strong>
                ACCOUNTING OF DISCLOSURES OF PROTECTED HEALTH INFORMATION
              </strong>

              <ol type="a">
                <li>
                  <strong>Disclosure Records</strong>: Business Associate will
                  keep a record of any Disclosure of PHI that Business Associate
                  makes, if Covered Entity would be required to provide an
                  accounting to Individuals of such Disclosures under 45 C.F.R.
                  § 164.528. Business Associate will maintain its record of such
                  Disclosures for six (6) years from the date of the Disclosure.
                </li>
                <li>
                  <strong>Data Regarding Disclosures</strong>: For each
                  Disclosure for which it is required to keep a record under
                  paragraph 7(a), Business Associate will record and maintain
                  the following information: (1) the date of Disclosure; (2) the
                  name of the entity or person who received the PHI and the
                  address of such entity or person, if known; (3) a description
                  of the PHI Disclosed; and (4) a brief statement of the purpose
                  of the Disclosure.
                </li>
                <li>
                  <strong>Provision to Covered Entity</strong>: Within twenty
                  (20) business days of receiving a notice from Covered Entity,
                  Business Associate will provide to Covered Entity its records
                  of Disclosures.
                </li>
                <li>
                  <strong>Request by Individual</strong>: If an Individual
                  requests an accounting of Disclosures directly from Business
                  Associate, Business Associate will forward the request and its
                  record of Disclosures to Covered Entity within twenty (20)
                  business days of Business Associate’s receipt of the
                  Individual’s request. Covered Entity will be responsible for
                  preparing and delivering the accounting to the Individual.
                  Business Associate will not provide an accounting of its
                  Disclosures directly to any Individual, unless directed by
                  Covered Entity to do so.
                </li>
              </ol>
            </li>

            <li>
              <strong>ACCESS TO BOOKS AND RECORDS</strong>

              <p>
                Business Associate will make its internal practices, books and
                records on the Use and Disclosure of PHI available to the
                Secretary to the extent required for determining compliance with
                the Privacy Rule, the Security Rule, or the Breach Notification
                Rule. No attorney-client, accountant-client or other legal
                privilege will be deemed waived by Business Associate or Covered
                Entity as a result of this Section.
              </p>
            </li>

            <li>
              <strong>TERMINATION</strong>

              <p>
                If either party materially breaches this BAA, the non-breaching
                party may terminate this BAA on 10 days’ written notice (“
                <strong>Termination Notice Period</strong>”) to the breaching
                party unless the breach is cured within the Termination Notice
                Period. If a cure under this Section 9 is not reasonably
                possible, the non-breaching party may immediately terminate this
                BAA.
              </p>
            </li>

            <li>
              <strong>
                RETURN OR DESTRUCTION OF PROTECTED HEALTH INFORMATION
              </strong>

              <ol type="a">
                <li>
                  <strong>Return or Destruction of PHI</strong>: Within sixty
                  (60) days of termination of this BAA, Business Associate will
                  return to Covered Entity all PHI that Business Associate or
                  its Subcontractors maintain in any form or format.
                  Alternatively, Business Associate may, upon Covered Entity’s
                  consent, destroy all such PHI and provide Covered Entity with
                  written documentation of such destruction.
                </li>
                <li>
                  <strong>
                    Retention of PHI if Return or Destruction is Infeasible
                  </strong>
                  : If Business Associate believes that returning or destroying
                  PHI at the termination of this BAA is infeasible, it will
                  provide written notice to Covered Entity within sixty (60)
                  days of the effective date of termination of this BAA. Such
                  notice will set forth the circumstances that Business
                  Associate believes makes the return or destruction of PHI
                  infeasible and the measures that Business Associate will take
                  for assuring the continued confidentiality and security of the
                  PHI. Business Associate will extend all protections,
                  limitations and restrictions of this BAA to Business
                  Associate’s Use or Disclosure of the PHI retained after
                  termination of this BAA and will limit further Uses or
                  Disclosures of such PHI to those purposes that make the return
                  or destruction of the PHI infeasible.
                </li>
              </ol>
            </li>

            <li>
              <strong>MISCELLANEOUS</strong>

              <ol type="a">
                <li>
                  <strong>COMPLIANCE WITH LAWS</strong>: The parties are
                  required to comply with federal and state laws. If this BAA
                  must be amended to secure such compliance, the parties will
                  meet in good faith to agree upon such amendments. If the
                  parties cannot agree upon such amendments, then either party
                  may terminate this BAA upon thirty (30) days’ written notice
                  to the other party.
                </li>
                <li>
                  <strong>CONSTRUCTION OF TERMS</strong>: The terms of this BAA
                  will be construed in light of any applicable interpretation or
                  guidance on the Privacy Rule, the Security Rule or the Breach
                  Notification Rule issued by HHS.
                </li>
                <li>
                  <strong>NO THIRD-PARTY BENEFICIARIES</strong>: Nothing in this
                  BAA will confer upon any person other than the parties and
                  their respective successors or assigns, any rights, remedies,
                  obligations, or liabilities whatsoever.
                </li>
                <li>
                  <strong>NOTICES</strong>: All notices required under the BAA
                  will be given in writing and will be delivered by (1) personal
                  service, (2) first class mail, or (3) messenger or courier.
                  All notices shall be addressed and delivered to the contact
                  designated by the party from time to time in writing to the
                  other party. Notices given by mail will be deemed for all
                  purposes to have been given forty-eight hours after deposit
                  with the United States Postal Service. Notices delivered by
                  any other authorized means will be deemed to have been given
                  upon actual delivery.
                </li>
                <li>
                  <strong>ENTIRE AGREEMENT</strong>: This BAA constitutes the
                  entire agreement between the parties with regard to the
                  Privacy Rule, the Security Rule and the Breach Notification
                  Rule, there are no understandings or agreements relating to
                  this BAA that are not fully expressed in this BAA and no
                  change, waiver or discharge of obligations arising under this
                  BAA will be valid unless in writing and executed by the party
                  against whom such change, waiver or discharge is sought to be
                  enforced.
                </li>
                <li>
                  <strong>WRITTEN AGREEMENT</strong>: This BAA will be
                  considered an attachment to the Terms and is incorporated as
                  though fully set forth within the Terms. This BAA will govern
                  in the event of conflict or inconsistency with any provision
                  of the Terms.
                </li>
              </ol>
            </li>
          </ol>
        </TypographyStylesProvider>
      </Box>
    </Container>
  );
};

export default BusinessAssociateAgreement;
