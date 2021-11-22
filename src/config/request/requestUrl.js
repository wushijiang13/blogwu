//文章
const getArticleList='/article/getArticleList'; //获取文章推荐list
const getArticleById='/article/getArticleById'; //根据Idh获取文章详情
const insertArticle='/article/insertArticle'; //新增文章
const updateArticle='/article/updateArticle'; //修改文章
//文章类型
const getArticleTypeList='/articleType/getArticleTypeList'; //获取文章推荐list
//文档
const getDocumentationList='/documentation/getDocumentationList'; //获取文档list
//文件
const deleteFile = '/files/delFile';
const uploadFile = '/files/upload';

export {
  getArticleList,
  getArticleById,
  insertArticle,
  updateArticle,
  getArticleTypeList,
  getDocumentationList,
  deleteFile,
  uploadFile
}
