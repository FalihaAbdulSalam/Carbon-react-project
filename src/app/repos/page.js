'use client';
import React, { useEffect, useState } from 'react';
import RepoTable from './RepoTable';
import {
  Link,
  DataTableSkeleton,
  Pagination,
  Grid,
  Column,
} from '@carbon/react';import { Octokit } from '@octokit/core';

export default function RepoPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'createdAt',
      header: 'Created',
    },
    {
      key: 'updatedAt',
      header: 'Updated',
    },
    {
      key: 'issueCount',
      header: 'Open Issues',
    },
    {
      key: 'stars',
      header: 'Stars',
    },
    {
      key: 'links',
      header: 'Links',
    },
  ];

  //   const rows = [
  //     {
  //       id: '1',
  //       name: 'Repo 1',
  //       createdAt: 'Date',
  //       updatedAt: 'Date',
  //       issueCount: '123',
  //       stars: '456',
  //       links: 'Links',
  //     },
  //     {
  //       id: '2',
  //       name: 'Repo 2',
  //       createdAt: 'Date',
  //       updatedAt: 'Date',
  //       issueCount: '123',
  //       stars: '456',
  //       links: 'Links',
  //     },
  //     {
  //       id: '3',
  //       name: 'Repo 3',
  //       createdAt: 'Date',
  //       updatedAt: 'Date',
  //       issueCount: '123',
  //       stars: '456',
  //       links: 'Links',
  //     },
  //   ];

  const octokitClient = new Octokit({});
  const LinkList = ({ url, homepageUrl }) => (
    <ul style={{ display: 'flex' }}>
      <li>
        <Link href={url}>GitHub</Link>
      </li>
      {homepageUrl && (
        <li>
          <span>&nbsp;|&nbsp;</span>
          <Link href={homepageUrl}>Homepage</Link>
        </li>
      )}
    </ul>
  );
  const getRowItems = (rows) =>
    rows.map((row) => ({
      ...row,
      key: row.id,
      stars: row.stargazers_count,
      issueCount: row.open_issues_count,
      createdAt: new Date(row.created_at).toLocaleDateString(),
      updatedAt: new Date(row.updated_at).toLocaleDateString(),
      links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
    }));

  useEffect(() => {
    async function getCarbonRepos() {
      const res = await octokitClient.request('GET /orgs/{org}/repos', {
        org: 'carbon-design-system',
        per_page: 75,
        sort: 'updated',
        direction: 'desc',
      });

      if (res.status === 200) {
        setRows(getRowItems(res.data));
      } else {
        setError('Error obtaining repository data');
      }
      setLoading(false);
    }

    getCarbonRepos();
  }, []);

  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  // If we're here, we've got our data!
  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
      <RepoTable
  headers={headers}
  rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
/>  <Pagination
  totalItems={rows.length}
  backwardText="Previous page"
  forwardText="Next page"
  pageSize={currentPageSize}
  pageSizes={[5, 10, 15, 25]}
  itemsPerPageText="Items per page"
  onChange={({ page, pageSize }) => {
    if (pageSize !== currentPageSize) {
      setCurrentPageSize(pageSize);
    }
    setFirstRowIndex(pageSize * (page - 1));
  }}
/>    </Column>
    </Grid>
  );
}
