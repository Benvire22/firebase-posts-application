import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Post, PostApi} from '../../types';
import axiosApi from '../../axiosApi';
import getDateFormat from '../../lib/getDateFormat';
import handleError from '../../lib/handleError';

interface PostForm {
  title: string;
  description: string;
}

interface Props {
  post: Post | null;
  onSubmit: (post: PostApi) => void;
  changePost: (currentPost: Post) => void;
  isError?: (error: boolean) => void;
}

const PostForm: React.FC<Props> = ({onSubmit, post, changePost, isError}) => {
  const [formData, setFormData] = useState<PostForm>({
    title: post ? post.title : '',
    description: post ? post.description : '',
  });
  const navigate = useNavigate();

  const changeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (post && isError) {
      try {
        const newPost: PostApi = {
          datetime: post.datetime,
          title: formData.title,
          description: formData.description,
        };

        changePost({
          ...post,
          description: formData.description,
          title: formData.title
        });

        await axiosApi.put(`/posts/${post.id}.json`, newPost);
      } catch (e) {
        handleError(e as Error);
        isError(true);
      }

    } else {
      const newPost = {
        title: formData.title,
        description: formData.description,
        datetime: getDateFormat(Date.now()),
      };

      onSubmit(newPost);
    }

    setFormData({
      title: '',
      description: '',
    });
    navigate('/');
  };

  return (
    <>
      <div className="row fs-3 mb-5">
        <h1 className="text-primary-emphasis text-center mb-5">{post ? 'Edit' : 'Create new'} post</h1>
        <div className="row mt-2 justify-content-center">
          <div className="col-8">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="mb-3 text-primary-emphasis">Title</label>
                <input
                  id="title" type="text" name="title"
                  className="form-control fs-4 mb-3 py-2"
                  value={formData.title}
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="mb-3 text-primary-emphasis">Description</label>
                <textarea
                  id="description" name="description"
                  className="form-control fs-4 mb-3 py-2"
                  value={formData.description}
                  onChange={changeForm}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success fs-3 px-5 py-2 mb-5">
                {post ? 'Save' : 'Send form'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;