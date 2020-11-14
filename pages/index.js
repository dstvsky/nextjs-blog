import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'


function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default function Home({ allPostsData }) {

  const [postsData, setPostsData] = useState(allPostsData)

  console.log('pd:', postsData);

  // const router = useRouter()

  // useEffect(() => {
  //   // Always do navigations after the first render
  //   router.push('/?counter=10', undefined, { shallow: true })
  // }, [])

  // useEffect(() => {
  //   // The counter changed!
  //   console.log('counter changed!')
  // }, [router.query.counter])


  const handleSectionChange = useCallback((e) => {
    console.log('event:', e, e.target);
    const sectionName = e.target.textContent;
    if (sectionName === 'All') {
      setPostsData(allPostsData);
    } else {
      
      setPostsData(postsData.filter(post => post.tags ? post.tags.includes(sectionName) : false));
      // setPostsData(postsData.filter(post => post.title.includes('Two')));
    }
    // e.preventDefault()

    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     /* Form data */
    //   }),
    // }).then((res) => {
    //   // Do a fast client-side transition to the already prefetched dashboard page
    //   if (res.ok) router.push('/dashboard')
    // })
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Matisse's Webiesite &hearts;</p>
      </section>
      <section>
        <ul>
          {/* <ActiveLink href="/work/">All</ActiveLink>
          <ActiveLink href="/work/papercraft">Papercraft</ActiveLink> */}
          {/* <li><a>All</a></li> */}
          <li><a onClick={handleSectionChange}>All</a></li>
          <li><a onClick={handleSectionChange}>papercraft</a></li>
          <li><a onClick={handleSectionChange}>lettering</a></li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {postsData.map(({ id, date, title, thumbnail }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                  {/* {title} */}
                  {/* <img src="/images/lettering/06_SHC_full.jpg" /> */}
                  <img src={thumbnail} />
                  
                </a>
              </Link>
              {/* <br /> */}
              
              {/* <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small> */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
