/**
 * API
 */

const { ajax_url } = PHP_CA_DATA;

export const _request = async (action, args) => {
  return await window.jQuery.ajax({
    type: 'POST',
    url: ajax_url,
    data: {
      action, 
      args
    },
    error: (err) => {
      console.log(err)
    }
  })
}

/**
 * 
 * @param {String} ids (1,2,3) 
 */
export const getCompareItems = async (ids, limitCompareFields) => {
  return await _request('ca_ajax_get_compare_items', {
    ids: ids.split(','),
    fields: limitCompareFields ? limitCompareFields.split(',') : [],
  })
}