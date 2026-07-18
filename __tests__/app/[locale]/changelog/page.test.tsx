import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangelogPage from '@/app/[locale]/changelog/page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async ({ namespace }: { namespace?: string } = {}) => {
    return (key: string) => {
      if (namespace === 'changelog') {
        const translations: Record<string, string> = {
          page_title: 'Changelog',
          page_description: 'Recent platform updates and improvements.',
          eyebrow: 'Platform updates',
          english_notice: 'This changelog is currently available in English only.',
          added: 'Added',
          improved: 'Improved',
          fixed: 'Fixed',
          back_to_home: 'Back to home',
        };
        return translations[key] ?? key;
      }
      return key;
    };
  }),
}));

describe('ChangelogPage', () => {
  it('renders the localized heading, notice, back link, and repository-backed entries in descending order', async () => {
    const Page = await ChangelogPage({ params: { locale: 'en' } });
    render(Page);

    expect(
      screen.getByRole('heading', { level: 1, name: /Changelog/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/English only/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to home/i })).toHaveAttribute(
      'href',
      '/en',
    );

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent('Accessibility and discovery updates');
    expect(headings[1]).toHaveTextContent('Player onboarding and search improvements');
    expect(headings[2]).toHaveTextContent('Scout dashboard and public profile improvements');

    expect(screen.getByText('2026-06-30')).toBeInTheDocument();
    expect(screen.getByText('2026-06-29')).toBeInTheDocument();
    expect(screen.getByText('2026-06-28')).toBeInTheDocument();
  });
});
