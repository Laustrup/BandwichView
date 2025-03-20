export const storageKey = 'language';

export default [
    {
        title: 'danish',
        abbreviation: 'da',
        dialect: 'dk',
        domainTypes: [
            'dk'
        ]
    },
    {
        title: 'english',
        abbreviation: 'en',
        dialect: 'us',
        domainTypes: [
            'com'
        ]
    }
].map(language => ({
    ...language,
    fullTitle: language.abbreviation + '_' + language.dialect,
    label: `languages.label.${language.abbreviation + '_' + language.dialect}`
}));