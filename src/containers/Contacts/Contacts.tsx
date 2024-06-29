import React, {useState} from 'react';

interface UserForm {
  name: string;
  email: string;
  phone: string;
}

const Contacts = () => {
  const [formData, setFormData] = useState<UserForm>({
    name: '',
    email: '',
    phone: '',
  });

  const changeUser = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <>
      <div className="row mt-5 px-5">
        <h1 className="text-warning mb-4">Контакты</h1>
        <p className="fs-4 mb-4 text-primary-emphasis">Вы можете связаться с нами следующими способами:</p>
        <ul className="fs-5 ms-5 text-primary-emphasis">
          <li className="mb-2">Телефон: +996 (XXX) XXX-XXX</li>
          <li className="mb-2">Email: info@example.com</li>
          <li className="mb-2">Адрес: street, city, country</li>
        </ul>
      </div>
      <div className="row px-5 fs-5">
        <h3 className="text-warning mb-5">Также вы можете оставить свою заявку:</h3>
        <div className="row mt-2 justify-content-center">
          <div className="col-8 text-primary-emphasis">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="fs-4 mb-2">Ваше имя</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  value={formData.name}
                  onChange={changeUser}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="fs-4 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  value={formData.email}
                  onChange={changeUser}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone" className="fs-4 mb-2">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="(000)-222-111"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                  className="form-control border-primary fs-5 mb-4 py-2"
                  value={formData.phone}
                  onChange={changeUser}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning text-white fs-4 px-4 py-2 mb-3">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;