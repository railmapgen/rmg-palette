import { createCachedPromise } from '@railmapgen/rmg-runtime/util';

const BASE_URL = 'https://api.github.com/repos/railmapgen';

type GitHubIssueLabel = {
    name: string;
};

export type GitHubIssue = {
    html_url: string;
    number: number;
    title: string;
    labels: GitHubIssueLabel[];
    created_at: string;
    body: string | null;
};

type PaginatedCallback<T, R> = (page: number, ...args: T[]) => Promise<R[]>;

const getAllPages = async <T, R>(paginatedCallback: PaginatedCallback<T, R>, ...args: T[]) => {
    const results: R[] = [];
    let page = 0;
    while (++page) {
        const pageResult = await paginatedCallback(page, ...args);
        results.push(...pageResult);
        if (pageResult.length < 100) {
            break;
        }
    }
    return results;
};

const getOpenIssuesByPage = async (page: number): Promise<GitHubIssue[]> => {
    const url = `${BASE_URL}/rmg-palette/issues`;
    const searchParams = new URLSearchParams({
        labels: 'resources',
        state: 'open',
        per_page: '100',
        page: page.toString(),
    });
    const res = await fetch(url + '?' + searchParams.toString());
    return await res.json();
};

const getAllOpenIssues = async () => {
    const issues = await getAllPages(getOpenIssuesByPage);
    return issues
        .filter(issue => !issue.labels.some(label => ['hold', 'need fixing'].includes(label.name)))
        .filter(issue => !issue.body?.includes('REPLACE ME'))
        .sort((a, b) => a.number - b.number);
};

export const OPEN_ISSUES_CACHE = createCachedPromise(getAllOpenIssues);
