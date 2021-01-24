const slugDivider = '__';

/**
 *
 * @param {string} slug 
 *
 *  @returns {string} URL from slug
 */
function getUrlFromSlug(slug) {
    return slug.includes('__') ? slug.split(slugDivider).join('/') : slug;
}

module.exports = {
    slugDivider,
    getUrlFromSlug,
};
