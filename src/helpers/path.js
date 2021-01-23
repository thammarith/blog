const slugDivider = '__';

/**
 *
 * @param {string} slug 
 *
 *  @returns {string} URL from slug
 */
function getUrlFromSlug(slug) {
    return slug.split(slugDivider).join('/');
}

module.exports = {
    slugDivider,
    getUrlFromSlug,
};
