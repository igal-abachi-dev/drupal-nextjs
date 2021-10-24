import {DateTime} from 'luxon';
import {sanitize} from "../hooks/useAxios";
import {toggleLight, setLastUpdate} from "../state/globalStateSlice";
import {useAppDispatch} from "../hooks/redux-hooks";


const mapToBlogPost = (p: any, sanitize: (text: string) => string) => {
    let post = {
        id: p.nid[0].value,
        type: p.type[0].target_id,
        title: p.title[0].value,
        body: p.body[0].value,
        summery: p.body[0].summery,
        created: p.created[0].value,
        changed: p.changed[0].value,
    };
    if (sanitize != null) {
        post.body = sanitize(post.body);
        post.title = sanitize(post.title);
    }
    return post;
};


export function AllPostsRenderer(data: any,dispatch:any) {
    // if (data == null || data.length == 0)
    //     return null;


    const posts = data.map(p => mapToBlogPost(p, sanitize));
    //console.log(posts);


    return posts.map(p => {
        return PostRenderer(p, true, dispatch);
    });//.filter(p => p != null);
};


export function PostRenderer(data: any, wasMapped = false, dispatch: any) {

    // if (data == null)
    //     return null;

    let p = wasMapped ? data : mapToBlogPost(data, sanitize);
    //console.log(p);

    return (<div key={'p-' + p.id} onMouseOver={e => {
        dispatch(toggleLight());
        dispatch(setLastUpdate(DateTime.now().toString()));
    }}>
        <h4>{p.title}</h4>
        <div
            dangerouslySetInnerHTML={{__html: p.body}}>
        </div>
    </div>);
};
