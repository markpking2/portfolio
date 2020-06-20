import React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Typewriter from "../components/typewriter";
import Helmet from "react-helmet";
import Img from "gatsby-image/withIEPolyfill";
import { graphql } from "gatsby";
import {
    AlgorithmsIcon,
    ApolloIcon,
    AwsIcon,
    AwsAPIGatewayIcon,
    AwsCloudfrontIcon,
    AwsLambdaIcon,
    AwsEC2Icon,
    AwsRoute53Icon,
    AwsS3Icon,
    Css3Icon,
    CypressIcon,
    DjangoIcon,
    ExpressIcon,
    GatsbyIcon,
    GitIcon,
    GraphQLIcon,
    HerokuIcon,
    Html5Icon,
    JavaScriptIcon,
    JestIcon,
    KnexIcon,
    LessIcon,
    LinuxIcon,
    MongoDBIcon,
    NetlifyIcon,
    NodejsIcon,
    PostgreSQLIcon,
    PrismaIcon,
    PythonIcon,
    RIcon,
    ReduxIcon,
    RestIcon,
    SassIcon,
    SQLIcon,
    WindowsIcon,
} from "../assets/skills";

export default ({ data }) => {
    const {
        cloudPractitioner: {
            childImageSharp: { sizes: cpSizes },
        },
        solutionsArchitect: {
            childImageSharp: { sizes: saSizes },
        },
    } = data;

    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <title>Skills - Mark King</title>
            </Helmet>
            <Layout>
                <Typewriter text="Things I've used..." />
                <section>
                    <div>
                        <StyledH3>Certifications</StyledH3>
                    </div>

                    <BadgeWrapper>
                        <A href="https://www.youracclaim.com/badges/2fd6df00-8f74-4116-b2f6-ebb2b18c6a48/public_url">
                            <StyledImg
                                title={"Mark and his two dogs"}
                                alt="Mark and his two dogs"
                                sizes={saSizes}
                            />
                        </A>
                    </BadgeWrapper>

                    <A href="https://www.youracclaim.com/badges/aa405a9b-115f-463f-808f-623de8717ffe/public_url">
                        <BadgeWrapper>
                            <StyledImg
                                title={"Mark and his two dogs"}
                                alt="Mark and his two dogs"
                                sizes={cpSizes}
                            />
                        </BadgeWrapper>
                    </A>
                </section>
                <SkillsSection>
                    <StyledH3>Frontend</StyledH3>
                    <SkillWrapper>
                        <StyledHtml5Icon w="50px" h="50px" />
                        <SkillTitle>HTML5</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledCss3Icon w="50px" h="50px" />
                        <SkillTitle>CSS3</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledJavaScriptIcon w="50px" h="50px" />
                        <SkillTitle>JavaScript ES6+</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledRIcon w="60px" h="50px" />
                        <SkillTitle>React (Hooks, Context API)</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledRIcon w="60px" h="50px" />
                        <SkillTitle>
                            React Native (Expo, React Native CLI)
                        </SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledReduxIcon w="50px" h="50px" />
                        <SkillTitle>Redux</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledGatsbyIcon w="40px" h="50px" />
                        <SkillTitle>GatsbyJS</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledApolloIcon w="50px" h="50px" />
                        <SkillTitle>Apollo Client</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledLessIcon w="50px" h="50px" />
                        <SkillTitle>LESS</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledSassIcon w="50px" h="50px" />
                        <SkillTitle>SASS</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledNetlifyIcon w="50px" h="50px" />
                        <SkillTitle>Netlify</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <StyledCypressIcon w="120px" h="50px" />
                        <SkillTitle>Cypress</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; Responsive Design</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; Accessibility</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; React Testing Library</SkillTitle>
                    </SkillWrapper>
                </SkillsSection>
                <SkillsSection>
                    <StyledH3>Backend</StyledH3>
                    <SkillWrapper>
                        <StyledNodejsIcon w="50px" h="50px" />
                        <SkillTitle>Node.js</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledPythonIcon w="50px" h="50px" />
                        <SkillTitle>Python</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledSQLIcon w="60px" h="50px" />
                        <SkillTitle>SQL</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; NoSQL</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledRestIcon w="50px" h="50px" />
                        <SkillTitle>REST APIs</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledGraphQLIcon w="50px" h="50px" />
                        <SkillTitle>GraphQL</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledExpressIcon w="120px" h="50px" />
                        <SkillTitle>Express.js</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledDjangoIcon w="50px" h="50px" />
                        <SkillTitle>Django</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledApolloIcon w="50px" h="50px" />
                        <SkillTitle>Apollo Server</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledHerokuIcon w="50px" h="50px" />
                        <SkillTitle>Heroku</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledKnexIcon w="50px" h="50px" />
                        <SkillTitle>Knex.js</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledPostgreSQLIcon w="50px" h="50px" />
                        <SkillTitle>PostgreSQL</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledMongoDBIcon w="50px" h="50px" />
                        <SkillTitle>MongoDB</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledPrismaIcon w="50px" h="50px" />
                        <SkillTitle>Prisma</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledJestIcon w="50px" h="50px" />
                        <SkillTitle>Jest</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; SuperTest</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsIcon w="50px" h="50px" />
                        <SkillTitle>Amazon Web Services</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsAPIGatewayIcon w="50px" h="50px" />
                        <SkillTitle>AWS API Gateway</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsCloudfrontIcon w="50px" h="50px" />
                        <SkillTitle>AWS CloudFront</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsEC2Icon w="50px" h="50px" />
                        <SkillTitle>AWS EC2</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsLambdaIcon w="50px" h="50px" />
                        <SkillTitle>AWS Lambda</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsRoute53Icon w="50px" h="50px" />
                        <SkillTitle>AWS Route53</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledAwsS3Icon w="50px" h="50px" />
                        <SkillTitle>AWS S3</SkillTitle>
                    </SkillWrapper>
                </SkillsSection>
                <SkillsSection>
                    <StyledH3>Other</StyledH3>
                    <SkillWrapper>
                        <StyledAlgorithmsIcon w="50px" h="50px" />
                        <SkillTitle>
                            Data Structures &amp; Algorithms
                        </SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledGitIcon w="50px" h="50px" />
                        <SkillTitle>Git</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledLinuxIcon w="50px" h="50px" />
                        <SkillTitle>Linux</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper>
                        <StyledWindowsIcon w="50px" h="50px" />
                        <SkillTitle>Windows</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; Continuous Integration</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>&bull; Automated Testing</SkillTitle>
                    </SkillWrapper>
                    <SkillWrapper style={{ height: "50px" }}>
                        <div style={{ height: "50px" }} />
                        <SkillTitle>
                            &bull; SCRUM/Agile Methodologies
                        </SkillTitle>
                    </SkillWrapper>
                </SkillsSection>
            </Layout>
        </>
    );
};

export const query = graphql`
    query badges {
        cloudPractitioner: file(
            relativePath: { regex: "/aws-certified-cloud-practitioner.png/" }
        ) {
            childImageSharp {
                sizes(maxWidth: 500) {
                    ...GatsbyImageSharpSizes
                }
            }
        }
        solutionsArchitect: file(
            relativePath: {
                regex: "/aws-certified-solutions-architect-associate.png/"
            }
        ) {
            childImageSharp {
                sizes(maxWidth: 500) {
                    ...GatsbyImageSharpSizes
                }
            }
        }
    }
`;

const StyledImg = styled(Img)`
    grid-row: 1 / -1;
    height: 200px;
    width: 200px;
    margin: 0;
    border-radius: 10px;
`;

const A = styled.a`
    text-shadow: none;
    text-decoration: none;
    background-image: none;
    &:hover {
        opacity: 0.5;
    }
`;

const SkillsSection = styled.section`
    margin-bottom: 1rem;
`;

const StyledH3 = styled.h3`
    margin-top: 0;
    color: white;
    display: block;
`;

const BadgeWrapper = styled.div`
    margin: 1rem 2rem 1rem 0;
    padding: 0.5rem 1rem;
    display: inline-flex;
    flex-wrap: wrap;
    border: 10px solid ${(props) => props.theme.tertiary};
    background: rgba(230, 230, 230, 0.6);
    border-radius: 5px;
`;

const SkillWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    margin: 0.4rem;
    height: 50px;
`;

const SkillTitle = styled.span`
    color: white;
`;

const StyledAlgorithmsIcon = styled(AlgorithmsIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledApolloIcon = styled(ApolloIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsIcon = styled(AwsIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsAPIGatewayIcon = styled(AwsAPIGatewayIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsCloudfrontIcon = styled(AwsCloudfrontIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsEC2Icon = styled(AwsEC2Icon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsLambdaIcon = styled(AwsLambdaIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsS3Icon = styled(AwsS3Icon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledAwsRoute53Icon = styled(AwsRoute53Icon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledCypressIcon = styled(CypressIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledCss3Icon = styled(Css3Icon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledDjangoIcon = styled(DjangoIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledExpressIcon = styled(ExpressIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledGatsbyIcon = styled(GatsbyIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledGitIcon = styled(GitIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledGraphQLIcon = styled(GraphQLIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledHerokuIcon = styled(HerokuIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledHtml5Icon = styled(Html5Icon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledJavaScriptIcon = styled(JavaScriptIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledJestIcon = styled(JestIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledKnexIcon = styled(KnexIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledLessIcon = styled(LessIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledLinuxIcon = styled(LinuxIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledMongoDBIcon = styled(MongoDBIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledNetlifyIcon = styled(NetlifyIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledNodejsIcon = styled(NodejsIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledPostgreSQLIcon = styled(PostgreSQLIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledPrismaIcon = styled(PrismaIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledPythonIcon = styled(PythonIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledRIcon = styled(RIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledReduxIcon = styled(ReduxIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledRestIcon = styled(RestIcon)`
    fill: ${(props) => props.theme.tertiary};
    stroke: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledSassIcon = styled(SassIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledSQLIcon = styled(SQLIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
const StyledWindowsIcon = styled(WindowsIcon)`
    fill: ${(props) => props.theme.tertiary};
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    margin: 0.4rem;
`;
