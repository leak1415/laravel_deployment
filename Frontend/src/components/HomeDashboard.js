import { h } from 'vue';

const panelClass =
    'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl';
const metricClass = 'rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/20';
const highlightClass = 'rounded-2xl border border-white/10 bg-slate-900/40 p-5';
const pillClass =
    'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300';
const actionClass =
    'inline-flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/20';

const renderMetricCard = (metric) =>
    h('article', { class: metricClass }, [
        h('p', { class: 'text-xs font-semibold uppercase tracking-[0.25em] text-slate-400' }, metric.label),
        h('p', { class: 'mt-4 text-3xl font-semibold text-white' }, metric.value),
        h('p', { class: 'mt-2 text-sm leading-6 text-slate-300' }, metric.detail),
    ]);

const renderHighlightCard = (highlight) =>
    h('article', { class: highlightClass }, [
        h('p', { class: 'text-sm font-semibold text-white' }, highlight.title),
        h('p', { class: 'mt-2 text-sm leading-6 text-slate-300' }, highlight.text),
    ]);

const renderLinkCard = (link, isActive, selectLink) => {
    const stateClass = isActive
        ? 'border-cyan-400/40 bg-cyan-400/10 shadow-lg shadow-cyan-950/20'
        : 'border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-white/5';

    return h(
        'a',
        {
            href: link.href,
            class:
                'group block rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 ' +
                stateClass,
            onMouseenter: () => selectLink(link),
            onFocus: () => selectLink(link),
        },
        [
            h('div', { class: 'flex items-start justify-between gap-4' }, [
                h('div', { class: 'flex items-center gap-3' }, [
                    h(
                        'div',
                        {
                            class:
                                'flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-semibold text-white ring-1 ring-white/10',
                        },
                        link.label.slice(0, 2).toUpperCase(),
                    ),
                    h('div', null, [
                        h('p', { class: 'text-lg font-semibold text-white' }, link.label),
                        h('p', { class: 'mt-1 text-sm leading-6 text-slate-300' }, link.description),
                    ]),
                ]),
                h(
                    'span',
                    {
                        class:
                            'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300',
                    },
                    'Open',
                ),
            ]),
            h('p', { class: 'mt-5 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200/80' }, link.href),
        ],
    );
};

export default {
    name: 'HomeDashboard',
    props: {
        links: {
            type: Array,
            default: () => [],
        },
        metrics: {
            type: Array,
            default: () => [],
        },
        highlights: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            query: '',
            selectedLinkHref: this.links[0]?.href ?? '',
        };
    },
    computed: {
        filteredLinks() {
            const query = this.query.trim().toLowerCase();

            if (!query) {
                return this.links;
            }

            return this.links.filter((link) =>
                [link.label, link.description, link.href].some((value) =>
                    String(value).toLowerCase().includes(query),
                ),
            );
        },
        activeLink() {
            const selected = this.filteredLinks.find((link) => link.href === this.selectedLinkHref);

            if (selected) {
                return selected;
            }

            return this.filteredLinks[0] ?? this.links.find((link) => link.href === this.selectedLinkHref) ?? this.links[0] ?? null;
        },
        visibleCount() {
            return this.filteredLinks.length;
        },
    },
    methods: {
        selectLink(link) {
            this.selectedLinkHref = link.href;
        },
        clearSearch() {
            this.query = '';

            if (this.links[0]) {
                this.selectedLinkHref = this.links[0].href;
            }
        },
    },
    render() {
        const activeLink = this.activeLink;

        return h('div', { class: 'relative min-h-screen overflow-hidden bg-slate-950 text-slate-100' }, [
            h('div', {
                class: 'pointer-events-none absolute inset-0',
                style: {
                    backgroundImage:
                        'radial-gradient(circle at top left, rgba(34, 211, 238, 0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.14), transparent 32%)',
                },
            }),
            h('div', {
                class: 'pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl',
            }),
            h('div', {
                class: 'pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl',
            }),
            h('div', {
                class: 'pointer-events-none absolute inset-0 opacity-25',
                style: {
                    backgroundImage:
                        'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                },
            }),
            h('main', { class: 'relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-6 lg:px-10 lg:py-10' }, [
                h(
                    'header',
                    {
                        class: 'flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl',
                    },
                    [
                        h('div', { class: 'flex items-center gap-4' }, [
                            h(
                                'div',
                                {
                                    class:
                                        'flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-bold text-cyan-100 ring-1 ring-cyan-300/30',
                                },
                                '26',
                            ),
                            h('div', null, [
                                h('p', { class: 'text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/70' }, 'Laravel 2026C'),
                                h('h1', { class: 'text-lg font-semibold text-white' }, 'Vue-powered dashboard shell'),
                            ]),
                        ]),
                        h('div', { class: 'flex items-center gap-3' }, [
                            h('span', { class: pillClass }, 'Scoped refresh'),
                        ]),
                    ],
                ),
                h('section', { class: 'grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]' }, [
                    h('article', { class: panelClass }, [
                        h('div', { class: 'flex flex-wrap items-center gap-3' }, [
                            h('span', { class: pillClass }, 'Vue front end'),
                            h('span', { class: pillClass }, 'Minimal rewrite'),
                        ]),
                        h('h2', { class: 'mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl' }, [
                            'A cleaner first impression for the admin area.',
                        ]),
                        h('p', { class: 'mt-5 max-w-2xl text-base leading-8 text-slate-300' }, [
                            'This homepage now feels like a real dashboard, but the existing Laravel CRUD screens remain exactly where they are.',
                        ]),
                        h('div', { class: 'mt-8 flex flex-col gap-4 sm:flex-row sm:items-center' }, [
                            h('label', { class: 'flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/5 focus-within:border-cyan-400/40' }, [
                                h('span', { class: 'text-cyan-200/70' }, 'Search'),
                                h('input', {
                                    value: this.query,
                                    type: 'search',
                                    placeholder: 'Filter users, customers, categories, products',
                                    class: 'w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500',
                                    onInput: (event) => {
                                        this.query = event.target.value;
                                    },
                                }),
                            ]),
                            h('span', { class: 'text-sm text-slate-400' }, `${this.visibleCount} of ${this.links.length} modules`),
                        ]),
                        h('div', { class: 'mt-8 flex flex-wrap gap-3' }, [
                            h(
                                'a',
                                { href: '/products', class: actionClass },
                                'Open products',
                            ),
                            h(
                                'a',
                                { href: '/categories', class: 'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10' },
                                'Review categories',
                            ),
                        ]),
                    ]),
                    h('aside', { class: panelClass }, [
                        h('div', { class: 'flex items-center justify-between gap-3' }, [
                            h('div', null, [
                                h('p', { class: 'text-xs font-semibold uppercase tracking-[0.35em] text-slate-400' }, 'Spotlight'),
                                h('h3', { class: 'mt-2 text-2xl font-semibold text-white' }, activeLink ? activeLink.label : 'No match'),
                            ]),
                            h('span', { class: pillClass }, activeLink ? 'Ready' : 'Empty'),
                        ]),
                        activeLink
                            ? h('div', { class: 'mt-6 space-y-4' }, [
                                  h('p', { class: 'text-sm leading-7 text-slate-300' }, activeLink.description),
                                  h('div', { class: 'rounded-2xl border border-white/10 bg-slate-950/70 p-4' }, [
                                      h('p', { class: 'text-xs font-semibold uppercase tracking-[0.25em] text-slate-400' }, 'Route'),
                                      h('p', { class: 'mt-2 font-mono text-sm text-cyan-100' }, activeLink.href),
                                  ]),
                                  h('div', { class: 'flex flex-wrap gap-3' }, [
                                      h('a', { href: activeLink.href, class: actionClass }, `Open ${activeLink.label}`),
                                      h(
                                          'button',
                                          {
                                              type: 'button',
                                              class: 'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10',
                                              onClick: () => this.clearSearch(),
                                          },
                                          'Reset search',
                                      ),
                                  ]),
                              ])
                            : h('div', { class: 'mt-6 rounded-2xl border border-dashed border-white/15 bg-slate-950/50 p-6 text-sm leading-7 text-slate-300' }, [
                                  'No modules match the current search. Clear it to bring everything back.',
                              ]),
                    ]),
                ]),
                h('section', { class: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4' }, this.metrics.map(renderMetricCard)),
                h('section', { class: 'space-y-4' }, [
                    h('div', { class: 'flex flex-wrap items-end justify-between gap-3' }, [
                        h('div', null, [
                            h('p', { class: 'text-xs font-semibold uppercase tracking-[0.35em] text-slate-400' }, 'Quick access'),
                            h('h3', { class: 'mt-2 text-2xl font-semibold text-white' }, 'Jump into the existing modules'),
                        ]),
                        h('p', { class: 'text-sm text-slate-400' }, `Showing ${this.visibleCount} of ${this.links.length}`),
                    ]),
                    this.visibleCount
                        ? h('div', { class: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4' }, this.filteredLinks.map((link) => renderLinkCard(link, activeLink?.href === link.href, this.selectLink)))
                        : h('div', { class: 'rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300' }, [
                              h('p', null, 'No modules match your search right now.'),
                              h(
                                  'button',
                                  {
                                      type: 'button',
                                      class: 'mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10',
                                      onClick: () => this.clearSearch(),
                                  },
                                  'Clear search',
                              ),
                          ]),
                ]),
                h('section', { class: 'grid gap-4 lg:grid-cols-3' }, this.highlights.map(renderHighlightCard)),
            ]),
        ]);
    },
};
