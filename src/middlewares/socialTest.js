export default (req, res, next) => {
  req.user = {
    id: '1123190603729317889',
    displayName: 'shalu chandwani',
    name: { familyName: 'chandwani', givenName: 'shalu' },
    emails:
      [{ value: 'bnpyuysnhq_1562062969@tfbnw.net', }],
    photos:
      [{
        value:
              'https://lh3.googleusercontent.com/-6Qo2sQMpMPw/VCF30oUr0dI/AAAAAAAAT1E/WCC-IzuuU3I/w414-h485/amazingPic1it.gif?fbclid=IwAR2MzAHdnwOLmiIdt1kAczfuFF3EWF0YuQIzdSOlu5HatU9AXRX7w__6rrE'
      }],
  };
  next();
};
